var TradeTable = React.createClass({
    render: function() {
        var items = [];
        for (var stock in this.props.stocks) {
            var stock = this.props.stocks[stock];
            items.push(<TradeRow stock={stock} />)
        }
        return (
            <table className="mdl-data-table mdl-shadow--2dp">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>При открытии</th>
                        <th>Последнее значение</th>
                        <th>Изменение</th>
                        <th>Максимум</th>
                        <th>Минимум</th>
                    </tr>
                    {items}
                    <TradeRow/>
                </thead>
            </table>
        )
    }
});

var TradeRow = React.createClass({

    render: function() {
       return (
           <tr>
               <td class="mdl-data-table__cell--non-numeric">WMT</td>
               <td>83.24</td>
               <td>93.47</td>
               <td>0.32</td>
               <td>94.26</td>
               <td>75.57</td>
           </tr>
       )
    }
});

var TradeApp = React.createClass({

    getInitialState: function() {
        var stocks = {};
        var value = 'неизвестно';
        socket.on('new value', data => {
    		this.setState({
    			value: data.value
    		});
		});
        return {
        	stocks: stocks,
        	value: value
        };
    },
    start: function() {
        socket.emit('start flow');
    },
    stop: function() {
        socket.emit('end flow');
    },
    render: function() {
        return (
        	<div>
        		<TradeTable stocks={this.state.stocks}/>
        		<button onClick={this.start}>start</button>
        		<button onClick={this.stop}>stop</button>
        		Значение: {this.state.value}
			</div>
		)
    }
});

ReactDOM.render(<TradeApp />, document.getElementById('tradeDesc'));

