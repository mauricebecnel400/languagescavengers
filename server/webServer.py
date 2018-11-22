from flask import Flask, request
app = Flask( __name__ )

print ('\n\n\nhello\n\n\n')

@app.route( '/', methods = ["GET"])
def get():
    print('PYTHON GOT THE IMAGE')
    return 'hi'

@app.route( '/post', methods = ["POST"])
def post():
    print( 'this is the post: ', request.files )
    return ''

app.run( host='localhost', port = 8088 )
