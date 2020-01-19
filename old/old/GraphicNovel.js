import React from 'react';
import Layout1 from '../../graphicNovel/layouts/Layout1';
import Layout2 from '../../graphicNovel/layouts/Layout2';
import Layout3 from '../../graphicNovel/layouts/Layout3';
import './GraphicNovel.css';
import Pagination from 'react-bootstrap/Pagination';

export default class GraphicNovel extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
    }

    gotoPage = (number) => {
        this.setState({id: number})
        this.props.history.push(`/graphic-novel/${number}`)
    }
    render () {
        let items = [], layout = <Layout1 />;
        for (let number = 1; number <= 3; number++) {
            items.push(
                <Pagination.Item onClick={() => this.gotoPage(number)} key={number} active={number === parseInt(this.state.id, 10)}>
                {number}
                </Pagination.Item>,
            );
        }
        if (this.state.id === 1) {
            layout = <Layout1 />;
        } else if (this.state.id === 2) {
            layout = <Layout2 />;
        } else if (this.state.id === 3) {
            layout = <Layout3 />;
        }
        console.log("id = ", this.state.id)
        return (
            <div className="graphic-novel-shell">
                <div className="pagination-shell-outer">
                    <div className="pagination-shell-inner">
                        <Pagination size="sm">{items}</Pagination>
                    </div>
                </div>
                <div className="layout-shell">
                    { layout }
                </div>
            </div>
        )
    }
}