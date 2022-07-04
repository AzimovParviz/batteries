import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar(props) {
    return (
        <div className='searchBar'>
            <form className='locationSelect' onChange={props.handleLocChange}>
                <select>
                    <option>Warehouse</option>
                    <option>Port</option>
                    <option>Logistics center</option>
                </select>
            </form>
            <input type='text' placeholder='sory by id' onChange={props.handleIdChange}></input>
            <form onChange={props.handleConChange}>
                <select>
                    <option value={'online'}>online</option>
                    <option value={'pending'}>pending</option>
                    <option value={'offline'}>offline</option>
                </select>
            </form>
            <input type='number' placeholder='sory by state of charge' onChange={props.handleChargeChange}></input>
        </div>
    )
}

export default SearchBar;