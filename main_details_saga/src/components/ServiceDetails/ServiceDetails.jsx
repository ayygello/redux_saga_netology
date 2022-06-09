import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  ListGroup,
  ListGroupItem,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleServiceRequest } from '../../actions/actionCreators';

const ServiceDetails = () => {
  const { item, loading, error } = useSelector((state) => state.singleService);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleServiceRequest(id));
  }, [dispatch]);

  const handleOnClick = () => {
    dispatch(fetchSingleServiceRequest(id));
  };

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
      <ListGroupItem>
        {item.name} {item.content} {item.price}
      </ListGroupItem>
    </div>
  );
};

export default ServiceDetails;
