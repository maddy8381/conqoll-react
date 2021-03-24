import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../../redux'

function FetchData({ citiesData, fetchData }) {


    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return citiesData.loading ? (
        <h2>Loading...</h2>
    ) : citiesData.error ? (
        <h2>{citiesData.error}</h2>
    ) : (
        <React.Fragment></React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        citiesData: state.cities
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchData())
    };
}
export default React.memo(
    connect(mapStateToProps, mapDispatchToProps)(FetchData)
)
