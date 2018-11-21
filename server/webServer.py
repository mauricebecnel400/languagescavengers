from flask import Flask, request
app = Flask( __name__ )
import classifier
import numpy as np
import cv2


NN = classifier.NN()

@app.route( '/', methods = ["GET"])
def get():
    print('PYTHON GOT THE IMAGE')
    return 'hi'

@app.route( '/post', methods = ["POST"])
def post():
    print( 'this is the post: ', request.files['photo'] )
    imgFile = request.files.get('imagefile', '')
    return ''

app.run( host='localhost', port = 8088 )
