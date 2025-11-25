from app import create_app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000, host='0.0.0.0')
    #app.run(debug=True, port=5002, host='0.0.0.0')#localhost ok