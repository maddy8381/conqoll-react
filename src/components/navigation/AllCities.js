import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCities, removeCity, toggleShortlist } from '../../redux'
import { Table } from 'react-bootstrap'

function AllCities({ citiesData, fetchCities, removeCity, toggleShortlist }) {


    useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    const deleteEventHandler = (id) => {
        // console.log(id);
        removeCity(id);
    }

    const handleShortlist = (id) => {
        toggleShortlist(id);
    }

    return citiesData.loading ? (
        <h2>Loading...</h2>
    ) : citiesData.error ? (
        <h2>{citiesData.error}</h2>
    ) : (
        <div className="container">
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
                            <tr key={city.Id}>
                                <td>{city.City}</td>
                                <td>{city.District}</td>
                                <td>{city.State}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-danger ml-4" onClick={() => handleShortlist(city.Id)}>
                                        {
                                            city.isShortlisted ? <li>Shortlisted</li> : <li>Shortlist</li>
                                        }
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger ml-4" onClick={() => deleteEventHandler(city.Id)}>
                                        Delete
                                    </button>
                                </td>
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
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCities: () => dispatch(fetchCities()),
        removeCity: (id) => dispatch(removeCity(id)),
        toggleShortlist: (id) => dispatch(toggleShortlist(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AllCities);
