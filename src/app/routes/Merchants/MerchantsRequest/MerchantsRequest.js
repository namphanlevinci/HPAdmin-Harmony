import React, { Component } from 'react';
import "./MerchantsRequest.css"
import "../MerchantsList/merchantsList.css"
import { getAll_Merchant_Requests, ViewMerchant_Request } from '../../../../actions/merchant-requests/actions'
import {connect} from 'react-redux';
import Pagination from "../MerchantsList/Pagination"
//
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';

class MerchantsRequest extends Component {
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
            totalRecords: this.props.MerchantRequests_List.length
          });
      }
    componentWillMount() {
        this.props.getAll_Merchant_Requests();
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
   

    //goto merchant profile
    _merchantReqProfile = (e) => {
      this.props.ViewMerchant_Request(e)
      this.props.history.push('/app/merchants/pending-profile')
    }
    render() { 
        var {
            pageLimit,
            startIndex,
            endIndex
          } = this.state;
        let ReqList = this.props.MerchantRequests_List
        if (ReqList) {
          if (this.state.search) {
            ReqList = ReqList.filter((e) => {
              // let name = e.businessName;
              return (
                e.businessName.trim().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                // name.trim().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                parseInt(e.merchantId) === parseInt(this.state.search)
              ) 
            })
          } else {
      
          }
      }
        console.log("PENDING LIST", ReqList)
        const renderReqList = ReqList.slice(startIndex, endIndex + 1).map((e) => {
            return (
                <tr key={e.merchantId} onClick={() => this._merchantReqProfile(e)}>
                <td>{e.merchantId}</td>
                {e.businessName !== null ? <td>{e.businessName}</td> : <td></td>}
                {e.principals !== null ? <td>{e.principals.firstName + ' ' + e.principals.lastName}</td> : <td></td>}
                <td>{e.email}</td>
                <td>{e.phone}</td>
            </tr>
            )
        })
        return ( 
            <div className="container-fluid MerList">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="MERCHANT REQUEST"/>}/>
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
                        totalRecords={ReqList.length}
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
                            <tr style={{borderBottom: '1px solid black'}}>
                                <th style={{ width:'10%' }}><span className="Mlist_table">ID</span> <i class="fa fa-unsorted"/></th>
                                <th style={{ width:'25%' }}><span className="Mlist_table">Business name</span> <i class="fa fa-unsorted"/></th>
                                <th style={{ width:'20%' }}><span className="Mlist_table">Owner</span> <i class="fa fa-unsorted"/></th>
                                <th style={{ width:'25%' }}><span className="Mlist_table">Email</span> <i class="fa fa-unsorted"/></th>
                                <th style={{ width:'20%' }}><span className="Mlist_table">Phone number</span> <i class="fa fa-unsorted"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderReqList}
                        </tbody>
                    </table>
                </div>
            </div>
         );
    }
}
 



const mapStateToProps = (state) => ({
    InfoUser_Login: state.User,
    MerchantRequests_List : state.MerchantRequests_List
  });
  const mapDispatchToProps = (dispatch) => ({
    getAll_Merchant_Requests: () => {
      dispatch(getAll_Merchant_Requests())
    },
    ViewMerchant_Request: (payload) => {
      dispatch(ViewMerchant_Request(payload))
    },
  });
  export default connect(mapStateToProps,mapDispatchToProps)(MerchantsRequest);