import React from 'react';
import {connect} from 'react-redux';
import { getAll_Merchants, SearchMerchants, ViewProfile_Merchants } from '../../../../actions/merchants/actions'
import Pagination from './Pagination'
import './merchantsList.css'
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
class Merchants extends React.Component {
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
  componentWillMount() {
    this.props.getAll_Merchants();
  }
  componentDidMount() {
    this.setState({
        totalRecords: this.props.Merchants_List.length
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

  _merchantsProfile = (merchant) => {
    this.props.ViewProfile_Merchants(merchant)
    this.props.history.push('/app/merchants/merchant-profile/general')
  }
  render() {

    var {
        pageLimit,
        startIndex,
        endIndex
      } = this.state;
    

    let  MerList  = this.props.Merchants_List
    if (MerList) {
        if (this.state.search) {
            MerList = MerList.filter((e) => {
            return (
              e.businessName.trim().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
              parseInt(e.merchantId) === parseInt(this.state.search)
            ) 
          })
        } else {
    
        }
    }
    // console.log(MerList)
    const renderMerList = MerList.slice(startIndex, endIndex + 1).map((merchant) => {
        return (
          <tr key={merchant.merchantId} onClick={() => this._merchantsProfile(merchant)}>
            <td>{merchant.merchantId}</td>
            {merchant.businessName !== null ? <td style={{fontWeight: 600}}>{merchant.businessName}</td> : <td></td>}
            {merchant.principals !== null ? <td>{merchant.principals.firstName + ' ' + merchant.principals.lastName}</td> : <td></td>}
            <td>{merchant.email}</td>
            <td>{merchant.phone}</td>
            {merchant.adminUser !== null ? <td style={{color: '#3f51b5', fontWeight: 600}}>{merchant.adminUser.first_name + ' ' + merchant.adminUser.last_name}</td> : <td>null</td>}
          </tr>
        )
    })
    return (
        <div className="container-fluid MerList">
            <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.MList"/>}/>
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
                        totalRecords={MerList.length}
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
                                <th style={{ width:'10%' }}><span className="Mlist_table">ID</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'20%' }}><span className="Mlist_table">Business name</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'15%' }}><span className="Mlist_table">Owner</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'25%' }}><span className="Mlist_table">Email</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'15%' }}><span className="Mlist_table">Phone number</span> <i className="fa fa-unsorted"/></th>
                                <th style={{ width:'10%' }}><span className="Mlist_table">Approved by</span> <i className="fa fa-unsorted"/></th>
                            </tr>
                    </thead>
                    <tbody>
                        {renderMerList}
                    </tbody>
                </table>
            </div>
        </div>
    )
  }
}


const mapStateToProps = (state) => ({
  InfoUser_Login: state.User,
  Merchants_List: state.MerchantsList,
});
const mapDispatchToProps = (dispatch) => ({
  getAll_Merchants: () => {
    dispatch(getAll_Merchants())
  },
  SearchMerchants: (payload) => {
    dispatch(SearchMerchants(payload))
  },
  ViewProfile_Merchants: (payload) => {
    dispatch(ViewProfile_Merchants(payload))
  },
});
export default connect(mapStateToProps,mapDispatchToProps)(Merchants);