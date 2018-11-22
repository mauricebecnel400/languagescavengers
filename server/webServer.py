from flask import Flask, request
app = Flask( __name__ )
import classifier
import numpy as np
import cv2
import base64



NN = classifier.NN()

print ('\n\n\nhello\n\n\n')

@app.route( '/', methods = ["GET"])
def get():
    print('PYTHON GOT THE IMAGE')
    return 'hi'

@app.route( '/post', methods = ["POST"])
def post():
    print( 'this is the post: ', request.files['photo'] )
    img =request.files['photo'].read()
    img = cv2.imdecode(np.fromstring(img, dtype=np.uint8), -1)
    labels = NN.clean_classify_one_image(img)
    print(labels)
    return labels


app.run( host='localhost', port = 8088 )
