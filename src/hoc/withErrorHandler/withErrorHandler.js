import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component  {
        state = {
            error: null,
        }

        componentDidMount () {
            this.reqIntercenor = axios.interceptors.request.use( req => {
                this.errorConfirmedHandler();
                return req;
            });

            this.resIntercenor = axios.interceptors.response.use(res => res, error => {
                this.setState( {error: error} );
            });
        }

        componentWillUnmount () {
            console.log('Will Unmont', this.reqIntercenor, this.resIntercenor);
            axios.interceptors.request.eject(this.reqIntercenor);
            axios.interceptors.response.eject(this.resIntercenor);
        }
 
        errorConfirmedHandler = () => {
            this.setState( {error: null} );
        }

        render () {
            return <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>;
        }    
    }
}

export default withErrorHandler;