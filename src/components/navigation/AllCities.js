import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'


function AllCities() {

    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        const data = await fetch('https://gist.githubusercontent.com/pratikg117/7ce66c7ade26a94772111334e40b287b/raw/fd5d7109921ca7a461a19ae73bfb71c9696bd139/Assignment%2520Json');
        const items = await data.json();
        console.log(items);
        setCityList(items);
    }


    return (
        <div class="container">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>District</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cityList.map(city => (
                            <tr>
                                <td>{city.City}</td>
                                <td>{city.District}</td>
                                <td>{city.State}</td>
                                <td><button>Shortlist</button> <button>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </div>
    )
}

export default AllCities
