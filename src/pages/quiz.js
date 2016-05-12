import React from 'react';
import { render } from 'react-dom';


const Question = require('./components/question.js')


const QuizPage = React.createClass({
  getInitialState() {
    return {handelnd: '', akustisch:'', lesend:'', bildlich:''};
  },
  handleSubmit() {

      superagent.post('http://localhost:3030/learnpackage/' + this.props.params.id)
      .auth('ruben', 'testest')
      .send({
        handelnd: this.state.handelnd,
        akustisch: this.state.akustisch,
        lesend: this.state.lesend,
        bildlich: this.state.bildlich
      })
      .end(function(err, res){
        if (err) alert(res.statusCode, err)
        if (res.statusCode == 200) {
          console.log(res.body)
          // window.location = '/#/addContent/' + res.body._id
        }
        })

  },

   getInitialState: function(){
    return {
      quiz: {},
      user_answers: [],
      step: 0
    }
  },


// quiz.json file mit den fragen und antworten laden
  componentDidMount: function(){
    $.getJSON("./assets/quiz.json", function(result) {
      this.setState({quiz: result});
    }.bind(this))
  },
// geht eine eine frage weiter
  nextStep: function(){
    this.setState({step: (this.state.step + 1)});
  },

  setAnswer: function(event){
    this.state.user_answers[this.state.step] = this.state.user_answers[this.state.step] || [];
    this.state.user_answers[this.state.step][parseInt(event.target.value)] = event.target.checked;
  },

  isAnswerRight: function(index){
    var result = true;
    var a,b,c,d = 0;
    Object.keys(this.state.quiz.questions[index].answers).map(function(value, answer_index){
      var answer = this.state.quiz.questions[index].answers[value]
      if (!this.state.user_answers[index] || (answer.is_right != (this.state.user_answers[index][value] || false))) {
        result = false;
        console.log(result);

        if (answer.handelnd == 1) {
        a += 1,
        console.log(a);
        
      }
      }
    }.bind(this));
    return result;
  },
  whichTyp: function(index){
    var a,b,c,d = 0;

    Object.keys(this.state.quiz.questions[index].answers).map(function(value, answer_index){
      var answer = this.state.quiz.questions[index].answers[value]
      if (answer.handelnd == 1) {
        a += 1,
        console.log(a);
        
      }
    }.bind(this));

    return a,c,b,c;

  },

  computeScore: function(index){
    var score = 0
    Object.keys(this.state.quiz.questions).map(function(value, index){
      if (this.isAnswerRight(parseInt(value))) {
        score = score + 1;
      }
    }.bind(this));
    return score;
  },

  renderResult: function(){
    var result = Object.keys(this.state.quiz.questions).map(function(value, index){
      if (this.isAnswerRight(value)) {
        return (
          <div>{"Question " + index + " You choosed: You were right!"}</div>
        )
      } else {
        return (
          <div>{"Question " + index + ": You were wrong!"}</div>
        )
      }
    }.bind(this));
    return (
      <div>
        <h3>Results</h3>
        <div>
          {this.computeScore()}/{this.state.quiz.questions.length}
        </div>
        <div>
          <h3>Your answers</h3>
            {result}
        </div>
      </div>
   );
  },

  render() {
   if (!this.state.quiz.questions) {return <div></div>}
    return (
      <div>
        <h1>{this.state.quiz.title}</h1>
        {(this.state.step < this.state.quiz.questions.length
          ? (<Question
                id={this.state.step}
                data={this.state.quiz.questions[this.state.step]}
                validateAnswers={this.nextStep}
                setAnswer={this.setAnswer}/>)
          : (<div>{this.renderResult()}</div>)
        )}
      </div>
    )
  }
})

module.exports = QuizPage;