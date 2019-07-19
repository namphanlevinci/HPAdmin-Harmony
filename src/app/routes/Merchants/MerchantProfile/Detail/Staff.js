import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../MerchantProfile.css'
import '../../MerchantsRequest/MerchantReqProfile.css'
import '../../MerchantsRequest/MerchantsRequest.css'
import '../../MerchantsList/merchantsList.css'
import './Detail.css'
import Pagination from '../../MerchantsList/Pagination'

class Staff extends Component {
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

    onChangePage = data => {
        this.setState({
          pageLimit: data.pageLimit,
          totalPages: data.totalPages,
          currentPage: data.page,
          startIndex: data.startIndex,
          endIndex: data.endIndex
        });
      };
    
    componentDidMount() {
        this.setState({
            totalRecords: this.props.MerchantProfile.staffs.length
          });
      }
    
      _SearchMerchants = async (e) => {
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
    
    render() {
        var {
            pageLimit,
            startIndex,
            endIndex
          } = this.state;

        let  e  = this.props.MerchantProfile.staffs
        if (e) {
            if (this.state.search) {
                e = e.filter((e) => {
                // let name = e.businessName;
                return (
                e.email.trim().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                e.displayName.trim().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                parseInt(e.staffId) === parseInt(this.state.search)
                ) 
            })
            } else {
        
            }
        }
        const renderStaffList = e.slice(startIndex, endIndex + 1).map((staff) => {
            return (
              <tr key={staff.staffId}>
                <td>{staff.staffId}</td>
                {staff !== null ? <td>{staff.firstName + ' ' + staff.lastName}</td> : <td></td>}
                {staff !== null ? <td>{staff.displayName}</td> : <td></td>}
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>{staff.roles.name}</td>
                <td></td>
              </tr>
            )
        })
        return ( 
            <div className="content GeneralContent">
                <div className="container-fluid MerList">
                <div className="MReqSP">
                    {/* SEARCH */}
                    <div className="search">
                        <form>
                            <input title="Search" value="" className="button" readOnly/>
                            <input type="text"
                            className="textbox"
                            placeholder="Search.."
                            value={this.state.search}
                            onChange={this._SearchMerchants} />
                        </form>
                    </div>
                    {/* THANH CHUYỂN TRANG */}
                    <div className="paginating-table">
                        <Pagination
                        totalRecords={e.length}
                        pageLimit={pageLimit || 10}
                        initialPage={1}
                        pagesToShow={10}
                        onChangePage={this.onChangePage}
                        PaginationFilter={this.state.PaginationFilter}
                        />
                    </div>
              </div>


            <div className="MListContainer">
                <table style={{ width:'100%' }}>
                    <thead>
                            <tr>
                                <th style={{ width:'10%' }}><span className="Mlist_table">Staff ID</span></th>
                                <th style={{ width:'13%' }}><span className="Mlist_table">Name</span></th>
                                <th style={{ width:'13%' }}><span className="Mlist_table">Display Name</span></th>
                                <th style={{ width:'10%' }}><span className="Mlist_table">Phone</span></th>
                                <th style={{ width:'10%' }}><span className="Mlist_table">Email</span></th>
                                <th style={{ width:'10%' }}><span className="Mlist_table">Role</span></th>
                                <th style={{ width:'10%' }}><span className="Mlist_table">Status</span></th>
                            </tr>
                    </thead>
                    <tbody>
                        {renderStaffList}
                    </tbody>
                </table>
            </div>
        </div>
            </div>
         );
    }
}



const mapStateToProps = (state) => ({
    MerchantProfile: state.ViewProfile_Merchants,
    InfoUser_Login: state.User,
})
export default (connect(mapStateToProps)(Staff));