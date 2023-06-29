from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
# model = joblib.load('DecisionTree.pkl')
# model = joblib.load('DecisionTreeRegressor.pkl')
model = joblib.load('DTR.pkl')

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    return render_template('index.html')

# Use the model to predict
@app.route('/predict', methods=['POST','GET'])
def predict():
    s =[int(i) for i in request.form.values()]
    s.reverse()
    temp = [str(i) for i in s]
    date = temp[0]+'-'
    if len(temp[1])==1:
        temp[1] = '0'+temp[1]
    if len(temp[2])==1:
        temp[2] = '0'+temp[2]
    date += (temp[1]+'-'+temp[2])
    s = [[i for i in s]]
    t = model.predict(s)
    return render_template('index.html', prediction_text="The Price is %.2f $ on the DATE: "%t[[0]]+date)

# Today's prediction
@app.route('/today', methods=['POST'])
@app.route('/tomorrow', methods=['POST'])
def predToday():
    s = request.get_json()
    s = s['date'].split('-')
    s = [int(i) for i in s]
    s = [[i for i in s]]
    t = model.predict(s)
    return jsonify(result="The Price is %.2f $ on the DATE: "%t[0], status=200)

if __name__=='__main__':
    app.run(debug=True)
