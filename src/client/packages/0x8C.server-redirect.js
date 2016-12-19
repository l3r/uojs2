import { Package, pad } from 'component/helpers'
import { actions as actionsConnect } from 'component/connect'
import { actions as actionsPostLogin } from 'component/post-login'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet8c.htm
export default class {

    meta = {
        number  : 0x8C,
        name    : 'Server Redirect',
        length  : 0x000B,
        type    : 'server',
        alias   : []
    };

    // Create base class
    get number() {
        return this.meta.number;
    }

    get name() {
        return this.meta.name;
    }

    get length() {
        return this.meta.length;
    }

    get alias() {
        return this.meta.alias;
    }

    get type() {
        return this.meta.type
    }
    // -------------

    action = ({ dispatch }, _package) => {
        const address   = [1, 2, 3, 4].map(offset => _package.getByte(offset));
        const port      = _package.getShort(5);
        const key       = [7, 8, 9, 10].map(offset => _package.getByte(offset));

        dispatch(actionsConnect.disconnectMaster()).then(
            zaeb => {
                const connect = dispatch(
                    actionsConnect.connectMaster({
                        host : address.join('.'),
                        port
                    })
                );

                connect
                    .then(
                        result => {
                            dispatch(
                                actionsConnect.compressionEnable()
                            );
                            dispatch(
                                actionsPostLogin.loginMaster({
                                    key
                                })
                            );
                        },
                        error => {
                            console.log(22222)
                        }
                    );
            }
        )


        /*console.warn(`received a server relay, but I can't connect to ${address}:${port} because I'm not able to yet...`);
        console.warn(`we'll just connect to the same address/port again`);

        socket.reconnect({
            key
        });
        dispatch({
            type: types.LOGIN_SERVER_RELAY,
            payload: key
        });*/
/*
        let error = this.message[99];

        if(this.message[_package.getByte(1)]) {
            error = this.message[_package.getByte(1)];
        }

        dispatch(
            actionsLogin.error({
                error
            })
        );
*/
    }

};