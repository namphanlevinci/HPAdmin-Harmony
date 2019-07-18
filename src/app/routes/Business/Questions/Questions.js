import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import { getAll_Questions } from "../../../../actions/business/actions"
import "./Questions.css"
import "../../Merchants/MerchantProfile/MerchantProfile.css"
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            question: '',
            qID: ''
        }
    }
     componentDidMount() {
        this.props.getAll_Questions()
    }
    _handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
            this.setState({
                [name]: value
            })
    }
    _toggleEdit = (e) => {
        this.setState({ edit: true,  question: e.value, qID : e.questionId})
    }
    _turnOffEdit = () => {
        this.setState({ edit: false, qID: '', question: '' })
    }
    _update = () => {
        const qID = this.state.qID
        const value = this.state.question
        axios.put('https://api2.levincidemo.com/api/question/' + qID, { value },{ headers: {"Authorization" : `Bearer ${this.props.InfoUser_Login.User.token}`} })
        .then((res) => {
            if (res.data.message === 'Success') {
                NotificationManager.success(res.data.message)
                this.props.getAll_Questions()
                setTimeout(() => this.setState({ edit: false, qID: '', question: ''}))
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    render() { 
        const q = this.props.Questions
        const renderQuestions = q.map((e) => {
            return (
                <div className="col-md-12 qbody" key={e.questionId}>
                    <h4>Question {e.questionId}</h4>
                    <div>
                        <h3>{e.value}</h3>
                        <div><button className='btn btn-green' onClick={() => this._toggleEdit(e)}>EDIT</button></div>
                    </div>
                </div>
            )
        })
        return (
            <div className="container-fluid Questions">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.Questions"/>}/>
                {this.state.edit !== false ? 
                <div className="POPUP">
                                <div className="POPUP-INNER3">
                                    <h2 style={{color: '#3f51b5'}}>EDIT QUESTION</h2>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><label>Question:</label></td>
                                                    <td><textarea name="question" value={this.state.question} onChange={this._handleChange}></textarea></td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                        <hr />
                                    <button href="#" className="btn btn-red" onClick={this._turnOffEdit}>BACK</button>
                                    <button className="btn btn-green" onClick={this._update}>UPDATE</button>
                                </div>
                            </div> 
                : null }
                <NotificationContainer/>
                <div className="text-center">
                        {renderQuestions}
                </div>
            </div>
        )
    }
}
 

const mapStateToProps = (state) => ({
    InfoUser_Login: state.User,
    Questions: state.getQuestions
})
const mapDispatchToProps = (dispatch) => ({
    getAll_Questions: () => {
      dispatch(getAll_Questions())
    }
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));