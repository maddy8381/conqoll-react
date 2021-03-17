import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCities } from '../../redux'
import { Table } from 'react-bootstrap'

function AllCities({ citiesData, fetchCities }) {


    useEffect(() => {
        fetchCities();
    });

    return citiesData.loading ? (
        <h2>Loading...</h2>
    ) : citiesData.error ? (
        <h2>{citiesData.error}</h2>
    ) : (
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
                        citiesData.cities.map(city => (
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

const mapStateToProps = state => {
    return {
        citiesData: state.cities
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCities: () => dispatch(fetchCities())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllCities);
