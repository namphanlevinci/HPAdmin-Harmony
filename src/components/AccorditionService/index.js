import React, { Component } from 'react'
import arrow_down from "@/assets/images/down-arrow.png";
import check_box from "@/assets/images/check_box.png";
import check_box_empty from "@/assets/images/check_box_empty.png";
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import "./style.scss";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenService: false
        }
    }

    toggle = () => {
        const { isOpenService } = this.state;
        this.setState({ isOpenService: !isOpenService });
    }

    render() {
        const { isOpenService } = this.state;
        const { category, selectServiceOfCategories, selectCategories } = this.props;
        return (
            <>
                <div
                    className="accordition_category"
                >
                    <img
                        onClick={() => selectCategories(category)}
                        src={category.selected ? check_box : check_box_empty}
                    />

                    <div
                        onClick={this.toggle}
                        style={{ display: 'flex', cursor: 'pointer', width: '100%' }}
                    >
                        {category.name}
                        <span style={{ marginLeft: 10 }}>
                            {
                                `(${category.staffServices ? category.staffServices.length : "0"})`
                            }
                        </span>
                    </div>

                    <img
                        style={{
                            transform: isOpenService ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                        src={arrow_down} className="arrow_down_accortion"
                    />
                </div>
                <SlideDown>
                    {
                        isOpenService &&
                        <>
                            {
                                category.staffServices && category.staffServices.map((sv => (
                                    <div
                                        key={sv.serviceId + "serviceAssgined"}
                                        className="accordition_service"
                                    >
                                        <img
                                            onClick={() => selectServiceOfCategories(sv)}
                                            src={sv.selected ? check_box : check_box_empty}
                                        />
                                        {sv.name}
                                    </div>
                                )))
                            }
                        </>
                    }
                </SlideDown>
            </>
        )
    }
}
