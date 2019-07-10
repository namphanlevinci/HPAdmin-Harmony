import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import { getAll_User, ViewProfile_User } from "../../../../actions/user/actions"
import {connect} from 'react-redux';
import Pagination from '../../Merchants/MerchantsList/Pagination'
import "../../Merchants/MerchantsList/merchantsList.css"
import "./User.css"
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search: "",
            totalRecords: "",
            totalPages: "",
            pageLimit: "",
            currentPage: "",
            startIndex: "",
            endIndex: "",
            PaginationFilter: false
         }
    }
    componentDidMount() {
        this.props.getAll_User();
    }

    onChangePage = data => {
        this.setState({
          pageLimit: data.pageLimit,
          totalPages: data.totalPages,
          currentPage: data.page,
          startIndex: data.startIndex,
          endIndex: data.endIndex
        });
      };
    _SearchUsers = async (e) => {
        await this.setState({ search: e.target.value });
        if(this.state.search.length === 1){
          this.PaginationFilter();
        }
    }
    PaginationFilter() {
        this.setState({ PaginationFilter: true });
        setTimeout(() => {
          this.setState({ PaginationFilter: false });
        }, 300);
      }
      _userProfile = (e) => {
        this.props.ViewProfile_User(e)
        this.props.history.push('/app/accounts/user-profile')
      }
    render() { 
        var {
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        let UserList = this.props.UserList
        if (UserList) {
            if (this.state.search) {
                UserList = UserList.filter((e) => {
                return (
                  e.firstName.trim().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                  e.email.trim().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                  parseInt(e.merchantId) === parseInt(this.state.search)
                ) 
              })
            } else {}
        }
        const renderUserList = UserList.slice(startIndex, endIndex + 1).map((e) => {
            return (
              <tr key={e.waUserId} onClick={() => this._userProfile(e)}>
                <td>{e.waUserId}</td>
                <td>Online</td>
                <td>{e.firstName + ' ' + e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.roleName}</td>
              </tr>
            )
        })
        return ( 
            <div className="container-fluid MerList">
            <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.users"/>}/>
                <div className="UserSearchBox">
                    {/* SEARCH */}
                    <div className="search">
                        <form>
                            <input title="Search" value="" className="button" readOnly/>
                            <input type="text"
                            className="textbox"
                            placeholder="Search.."
                            value={this.state.search}
                            onChange={this._SearchUsers} />
                        </form>
                    </div>
                    {/* THANH CHUYỂN TRANG */}
                    <div className="paginating-table">
                        <Pagination
                        totalRecords={UserList.length}
                        pageLimit={pageLimit || 10}
                        initialPage={1}
                        pagesToShow={10}
                        onChangePage={this.onChangePage}
                        PaginationFilter={this.state.PaginationFilter}
                        />
                </div>
              </div>


            <div className="MListContainer" >
                <table style={{ width:'100%' }}>
                    <thead>
                    <tr style={{borderBottom: '1px solid black'}}>
                                <th style={{ width:'10%' }}><span className="Mlist_table">ID</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'10%' }}><span className="Mlist_table">Status</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'20%' }}><span className="Mlist_table">Name</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'20%' }}><span className="Mlist_table">Email</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'20%' }}><span className="Mlist_table">Phone</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'20%' }}><span className="Mlist_table">Role</span> <i className="fa fa-unsorted"/></th>
                            </tr>
                    </thead>
                    <tbody>
                        {renderUserList}
                    </tbody>
                </table>
            </div>
        </div>
         );
    }
}
 
const mapStateToProps = (state) => ({
    UserList : state.getAllUser
  });
  const mapDispatchToProps = (dispatch) => ({
    getAll_User: () => {
        dispatch(getAll_User())
      },
    ViewProfile_User: (payload) => {
      dispatch(ViewProfile_User(payload))
    },
  });
  export default connect(mapStateToProps,mapDispatchToProps)(Users);