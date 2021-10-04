import React, { Component } from 'react';
import NewButton from "@components/Button/Search";
import Loading from "@components/Loading";
import IconButton from "@components/IconButton";
import ContainerHeader from "@components/ContainerHeader/index";
import SearchComponent from "@/util/searchComponent";
import IntlMessages from "@/util/IntlMessages";
import DragTrello from "./DragTrello";
import { connect } from "react-redux";
import { fetchApiByPage } from "@/actions/fetchApiActions";
import {
    getTicketByID,
    getTicketCommentById,
    getTicketLogById,
    changeStatus,
} from "@/actions/ticketActions";
import Pagination from "./Pagination";
import { Helmet } from "react-helmet";
import iconTable from "@/assets/images/table-grid.png";
import axios from "axios";
import { config } from "@/url/url";
import "./Ticket.css";

const URL = config.url.URL;


class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchValue: "",
            currentPage: 1,
            count: 1,
            isLoading: false
        }
    }

    componentDidMount() {
        this.fetchApi(1);
    }

    changePage = (page) => {
        this.setState({ currentPage: page });
        this.fetchApi(page);
    }

    ticketDetail = (ID) => {
        const path = "/app/ticket/detail";
        this.props.getTicketByID(ID, path);
        this.props.getTicketCommentById(ID);
        this.props.getTicketLogById(ID);
    }

    switchTableView = () => {
        this.props.history.push("/app/ticket");
    }

    addTicket = () => {
        this.props.history.push("/app/ticket/add-ticket");
    };

    changeStatus = async(id, status) => {
        this.setState({isLoading : true})
        const { user } = this.props;
        const { data } = await axios.put(
            `${URL}/ticket/${id}/stateChange`,
            {
                status,
            },
            {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        );

        if (data && parseInt(data.codeNumber) === 200) {
            this.props.notifySuccess(data?.message);
            this.fetchApi(this.state.currentPage);
        } else {
            this.fetchApi(this.state.currentPage);
        }
    };

    updateItem = (result) => {
        const { destination, source, draggableId } = result;
        if(destination){
            if(destination.droppableId !== source.droppableId){
                let { data } = this.state;
                const index = data.findIndex(ticket => parseInt(ticket.id) === parseInt(draggableId));
                if (index !== -1) {
                    data[index].status = destination.droppableId;
                }
                this.setState({ data });
                this.changeStatus(draggableId, destination.droppableId);
            }
        }
    }

    fetchApi = async (page) => {
        this.setState({ isLoading: true })
        const { searchValue } = this.state;
        const url = `ticket/?keySearch=${searchValue}&page=${page}&row=20&status=all`;
        const { user } = this.props;
        const { data } = await axios.get(`${URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });

        if (data && parseInt(data.codeNumber) === 200) {
            this.setState({
                data: data.data || [],
                count: data.count || 0,
                isLoading: false,
            });
        } else {
            alert(data.message);
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { currentPage, data, count, isLoading } = this.state;
        const match = { path: "/app/ticket" }
        return (
            <div style={{ position: "relative", padding: "22px 22px 16px 22px" }}>
                <Helmet>
                    <title>Ticket | Harmony Admin</title>
                </Helmet>
                {isLoading && <Loading />}
                <ContainerHeader
                    match={match}
                    title={<IntlMessages id="sidebar.dashboard.ticket" />}
                />
                <div className="row_title_ticket_column">
                    <div className="container-search-component" style={{}}>
                        <SearchComponent
                            placeholder="Search by ID, Title, Application, Client Name"
                            value={this.state.search}
                            onChange={(e) => this.setState({ searchValue: e.target.value })}
                            onKeyPress={() => this.fetchTicket(currentPage)}
                            onClickIcon={() => this.setState({ searchValue: "" })}
                        />
                        <NewButton
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.fetchTicket(currentPage)}
                        >
                            Search
                        </NewButton>
                    </div>

                    <NewButton
                        onClick={this.addTicket}
                        blue
                        style={{ minWidth: "160px" }}
                    >
                        New Ticket
                    </NewButton>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0px 0px 0px" }}>
                    <Pagination
                        activePage={currentPage}
                        handlePageChange={this.changePage}
                        totalItem={count}
                    />
                    <IconButton
                        title="Table view"
                        onPress={this.switchTableView}
                        icon={iconTable}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <DragTrello
                        ordered={[
                            "backlog",
                            "waiting",
                            "inprogress",
                            "complete"
                        ]}
                        getTicketDetail={this.ticketDetail}
                        data={data}
                        updateItem={this.updateItem}
                    />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    apiData: state.fetchApi,
    user: state.verifyUser.user,
});
const mapDispatchToProps = (dispatch) => ({
    fetchApiByPage: (url) => {
        dispatch(fetchApiByPage(url));
    },
    getTicketByID: (ID, path) => {
        dispatch(getTicketByID(ID, path));
    },
    getTicketCommentById: (ID, path) => {
        dispatch(getTicketCommentById(ID, path));
    },
    getTicketLogById: (ID, path) => {
        dispatch(getTicketLogById(ID, path));
    },
    changeStatus: (payload) => {
        dispatch(changeStatus(payload));
    },
    notifySuccess: (payload) => {
        dispatch({
            type: "SUCCESS_NOTIFICATION",
            payload
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);