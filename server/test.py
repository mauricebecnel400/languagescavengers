import os
import os.path
from PIL import Image
from PIL import ImageFile

import numpy as np
import keras
from keras.applications.inception_v3 import decode_predictions
from keras.applications.inception_v3 import preprocess_input as inception_v3_preprocess_input
from keras.layers import Input, Dense, Activation, Dropout
from keras.layers import ZeroPadding2D, MaxPooling2D, AveragePooling2D, Conv2D, BatchNormalization, Flatten
from keras.models import Model
from keras.preprocessing.image import ImageDataGenerator
import time
from tensorflow.python.client import device_lib
import glob
from googletrans import Translator
import threading

kill = False

def main():
    base_model = load_base_model('ResNet50', None)
    # Use correct image preprocessing for model
    if base_model.name == ('inception_v3'):
        preprocess_input = inception_v3_preprocess_input
    else:
        preprocess_input = preprocess_input_wrapper
    # Rewrite this bad boy
    waitForIn = threading.Thread(target=waitForTerminate)
    waitForIn.start()
    while True:
        images, filenames = load_images('image', 224)
        if len(filenames) == 0:
            if kill:
                print("The user terminated the program\n")
                exit(0)
            time.sleep(2)
        else:
            if kill:
                print("The user terminated the program\n")
                exit(0)
            preds = base_model.predict(images)
            print()
            print(filenames[0])
            print()
            print('Predicted:', decode_predictions(preds, top=10))
            os.remove('image/'+filenames[0])

    #t = Translator()

    #print(t.translate('hello', dest='es', src='en'))

def waitForTerminate():
    terminate = input()
    kill = True
    print("user killed the thread")
    exit(0)

def load_base_model(model_name, input_shape=None):
    if model_name == 'InceptionV3':
        if input_shape == None:
            img_size = 227
            input_shape = (img_size, img_size, 3)
        base_model = keras.applications.inception_v3.InceptionV3(weights='imagenet',
                                                                 include_top = True,
                                                                 input_shape=input_shape,
                                                                 pooling = 'avg')
    elif model_name == 'ResNet50':
        if input_shape == None:
            img_size = 224
            input_shape = (img_size, img_size, 3)
        base_model = keras.applications.resnet50.ResNet50(weights='imagenet',
                                                          include_top = True,
                                                          input_shape = input_shape,
                                                          pooling = 'avg')
    return base_model

def preprocess_input_wrapper(x):
    """Wrapper around keras.applications.imagenet_utils.preprocess_input()
    to make it compatible for use with keras.preprocessing.image.ImageDataGenerator's
    `preprocessing_function` argument.
    Parameters
    ----------
    x : a numpy 3darray (a single image to be preprocessed)
    Note we cannot pass keras.applications.imagenet_utils.preprocess_input()
    directly to to keras.preprocessing.image.ImageDataGenerator's
    `preprocessing_function` argument because the former expects a
    4D tensor whereas the latter expects a 3D tensor. Hence the
    existence of this wrapper.
    Returns a numpy 3darray (the preprocessed image).
    """

    X = np.expand_dims(x, axis=0)
    X = imagenet_utils_preprocess_input(X)
    return X[0]

def load_images(folder, img_size):
        '''
        return an array containing all the images from the given folder.
        all images are converted to RGB in channel_last format, and resized
        to img_size x img_size
        '''

        images = []
        filenames = []
        ignore_list = ['.AppleDouble', '__pycache__', '.DS_Store']
        for filename in os.listdir(folder):
                if filename in ignore_list:
                        continue
                img = Image.open(os.path.join(folder, filename))
                if img is not None:
                        rbgimg = Image.new("RGB", img.size)
                        rbgimg.paste(img)
                        rbgimg = rbgimg.resize((img_size, img_size), Image.ANTIALIAS)
                        np_img = np.array(rbgimg)
                        images.append(np_img)
                        filenames.append(filename)

        images = np.array(images)

        return images, filenames


main()
