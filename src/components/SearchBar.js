import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar(props) {
    return (
        <div className='searchBar'>
                <select onChange={props.handleLocChange}>
                    <option>Warehouse</option>
                    <option>Port</option>
                    <option>Logistics center</option>
                </select>
            <input type='text' placeholder='sory by id' onChange={props.handleIdChange}></input>
                <select onChange={props.handleConChange}>
                    <option value={'online'}>online</option>
                    <option value={'pending'}>pending</option>
                    <option value={'offline'}>offline</option>
                </select>
            <input type='number' placeholder='sory by state of charge' onChange={props.handleChargeChange}></input>
        </div>
    )
}

export default SearchBar;