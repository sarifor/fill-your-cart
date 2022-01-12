import React from "react";

class Each extends React.Component {
    handleSaveSelectedItems = (e) => {
        e.preventDefault();

        const selectedItem = {
            name: this.props.name,
            price: this.props.price,
        };

        this.props.saveSelectedItems(selectedItem);
    };

    render() {
        return (
            <>
                {this.props.isSelectedItems === true ? <p>[Items selected by anonymous user]</p> : <p></p>}
                <p>Name: {this.props.name}</p>
                <p>Price: {this.props.price}</p>

                <form onSubmit={this.handleSaveSelectedItems}>
                    <button type="submit">Click!</button>
                </form>
            </>
        );
    };
};

export default Each;