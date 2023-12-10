import mysql.connector
import os
import time
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
import mysql.connector
from werkzeug.utils import secure_filename

#import requests

app = Flask(__name__)
CORS(app)

#CORS(app, resources={r"/productos/*": {"origins": "http://127.0.0.1:5000"}, "methods": ["GET", "HEAD", "POST", "PUT", "DELETE"]})

#CLASE CATALOGO

class Catalogo:
    
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor(dictionary = True)

        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
            codigo INT,
            nombre VARCHAR(50) NOT NULL,
            autor VARCHAR(50) NOT NULL,
            imagen VARCHAR(255))
            ''')
        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def listar(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        return productos
    
    def buscar(self,search):
        self.cursor.execute(f"""SELECT * FROM productos WHERE nombre LIKE "%{search}%" OR autor LIKE "%{search}%" """)
        productos = self.cursor.fetchall()
        return productos
    
    def seleccionar(self,codigo):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    def agregar(self,codigo,nombre,autor,imagen):
        
        if codigo == -1:
            i = 0
            while True:
                self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {i}")
                producto_existe = self.cursor.fetchone()
                if not producto_existe:
                    codigo = i
                    break
                else:
                    i += 1
        else:
            self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
            producto_existe = self.cursor.fetchone()
            if producto_existe:
                return False

        sql = "INSERT INTO productos (codigo, nombre, autor, imagen) VALUES (%s,%s,%s,%s)"
        valores = (codigo,nombre,autor,imagen)

        self.cursor.execute(sql,valores)
        self.conn.commit()
        return True
    
    def modificar(self,codigo,new_nombre,new_autor,new_imagen):
        sql = f"UPDATE productos SET nombre = %s, autor= %s, imagen = %s WHERE codigo = %s"
        valores = (new_nombre,new_autor,new_imagen,codigo)

        self.cursor.execute(sql,valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    def mostrar(self,codigo):
        product = self.seleccionar(codigo)
        if product:
            print("-"*10)
            print(f"Codigo: {product['codigo']}")
            print(f"Nombre: {product['nombre']}")
            print(f"Autor: {product['autor']}")
            print(f"Imagen: {product['imagen']}")
            print("-"*10)
        else:
            print("Producto no encontrado")

    def eliminar(self, codigo):
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0
    
#CREAR CATALOGO
catalogo = Catalogo(host = 'localhost', user='root', password= '', database= 'creart')



ruta_destino = 'static/img'

#Muestra todos los productos
@app.route("/productos", methods=["GET"])
def listar():
    productos = catalogo.listar()
    return jsonify(productos)

#Muestra los productos que coincidan con la busqueda
@app.route("/search/<string:search>", methods=["GET"])
def buscar(search):
    productos = catalogo.buscar(search)
    return jsonify(productos)

#Muestra el producto que coincida con el codigo
@app.route("/productos/<int:codigo>", methods=["GET"])
def seleccionar(codigo):
    product = catalogo.seleccionar(codigo)
    if product:
        return jsonify(product)
    else:
        return "Producto no encontrado", 404

#Agrega un producto a partir de un form
@app.route("/productos", methods=["POST"])
def agregar():
    codigo = request.form['codigo']
    nombre = request.form['nombre']
    autor = request.form['autor']
    imagen = request.files['imagen']
    nombre_imagen = secure_filename(imagen.filename)

    #imagen = request.form['imagen']
    #nombre_imagen = secure_filename("default.jpg")

    #nombre_base, extension = os.path.splitext(nombre_imagen)
    #nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

    if catalogo.agregar(codigo,nombre,autor,nombre_imagen):
        #img_data = requests.get(imagen).content
        #with open(ruta_destino + '/' +nombre_imagen, 'wb') as handler:
        #    handler.write(img_data)
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        return jsonify({"mensaje": "Agregado con exito"}), 201
    else:
        return jsonify({"mensaje": "Codigo ya existe"}), 400
    
#Modificar producto
@app.route('/productos/<codigo>', methods=['PUT'])
@cross_origin()
def modificar_producto(codigo):
    
    producto = catalogo.seleccionar(codigo)
    if producto:
        ruta_imagen = os.path.join(ruta_destino, producto['imagen'])
        
        new_nombre = request.form["nombre"]
        new_autor = request.form["autor"]
        imagen = request.files['imagen']
        nombre_imagen = secure_filename(imagen.filename)

        #print(codigo)#print(new_nombre)#print(new_autor)#print(nombre_imagen)

        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

        if catalogo.modificar(codigo, new_nombre,new_autor, nombre_imagen):

            imagen.save(os.path.join(ruta_destino, nombre_imagen))

            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)
                
            return jsonify({"mensaje": "Producto modificado"}), 200
        else:
            return jsonify({"mensaje": "Producto no encontrado"}), 404
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 404
    
#Eliminar Producto
@app.route("/productos/<int:codigo>", methods=["DELETE"])
def eliminar(codigo):
    
    producto = catalogo.seleccionar(codigo)
    if producto:
        ruta_imagen = os.path.join(ruta_destino, producto['imagen'])
        
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

        if catalogo.eliminar(codigo):
            return jsonify({"mensaje": "Producto eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el producto"}),500
    else:
        return jsonify({"mensaje": "Producto no encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)