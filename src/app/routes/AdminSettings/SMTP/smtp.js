import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import '../Setting.css'
class SMTP extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container-fluid">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="SMTP"/>}/>
                        <form className="form-style-7">
                        <h1>CHANGE MAIL SERVER</h1>
                            <ul>
                            <li>
                                <label for="HOST">HOST</label>
                                <input type="text" name="HOST" maxlength="100" value="127.0.0.1" />
                            </li>
                            <li>
                                <label for="USERNAME">USERNAME</label>
                                <input type="text" name="USERNAME" maxlength="100" value="Tu123"/>
                            </li>
                            <li>
                                <label for="PASSWORD">PASSWORD</label>
                                <input type="password" name="PASSWORD" maxlength="100" value="12312312312312"/>
                            </li>
                            <li>
                                <label for="EMAIL">ADMIN EMAIL</label>
                                <input type="email" name="EMAIL" maxlength="100" value="tu.tran@levincigroup21.com"/>
                            </li>
                            <li>
                                <label for="PORT">PORT</label>
                                <input type="text" name="PORT" maxlength="100" value="578"/>
                            </li>
                            <li>
                                <input style={{cursor: "pointer"}} type="submit" value="UPDATE" />
                            </li>
                            </ul>
                        </form>
                    </div>
         );
    }
}
 
export default SMTP;