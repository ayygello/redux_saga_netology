import React, { useEffect } from 'react';
import './ServiceList.css';
import { Spinner, Alert, ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceRequest } from '../../actions/actionCreators';
import { Link } from 'react-router-dom';

const ServicesList = () => {
  const { items, loading, error } = useSelector((state) => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServiceRequest());
  }, [dispatch]);

  const handleOnClick = () => {
    dispatch(fetchServiceRequest());
  };

  console.log(items);

  if (loading) {
    return (
      <div className='wrapper'>
        <Spinner animation='border' variant='danger' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='wrapper'>
        <Alert variant='danger'>
          Произошла ошибка!{' '}
          {
            <Button variant='dark' onClick={handleOnClick}>
              Повторить запрос
            </Button>
          }
        </Alert>
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <ListGroup>
        {items.map((o) => (
          <ListGroup.Item key={o.id}>
            <Link to={`/${o.id}/details`}>
              {o.name} {o.price}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ServicesList;
