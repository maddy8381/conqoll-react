import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCities, toggleShortlist } from '../../redux'
import { Table } from 'react-bootstrap'

function ShortlistedCities({ citiesData, fetchCities, toggleShortlist }) {

    useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    const handleShortlist = (id) => {
        toggleShortlist(id);
    }

    return (
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
                    {citiesData.cities.filter(city => city.isShortlisted).map(cityShortlisted => (
                        <tr key={cityShortlisted.Id}>
                            <td>{cityShortlisted.City}</td>
                            <td>{cityShortlisted.District}</td>
                            <td>{cityShortlisted.State}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger ml-4" onClick={() => handleShortlist(cityShortlisted.Id)}>
                                    Remove
                                    </button>
                            </td>
                        </tr>
                    ))}

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
        toggleShortlist: (id) => dispatch(toggleShortlist(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ShortlistedCities);
