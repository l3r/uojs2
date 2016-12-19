// import { actions } from 'component/features'

// http://necrotoolz.sourceforge.net/kairpacketguide/packeta9.htm
export default class {

    meta = {
        number  : 0xA9,
        name    : 'Character List',
        length  : null,
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
        const qty = _package.getByte(3);
        const result = [];

        if (qty < 5 || qty > 7) {
            throw 'character count in 0xA9 is not valid. it should be in (5, 6, 7)';
        }

        for(let i = 0; i < qty; i++) {
            result.push({
                name: _package.getString(4 + i * 60, 30),
                password: _package.getString(34 + i * 60, 30)
            });
        }

        const qtyCities = _package.getByte(4 + (qty * 60));
        const offset = 4 + (qty * 60);

        for(let i = 0; i < qtyCities; i++) {
            console.log({
                name : _package.getString(offset + (1 + i * 63), 30),
                tavern : _package.getString(offset + (32 + i * 63), 30)
            })
        }

        // @TODO: Get flags

        /*
        dispatch({
            type: types.LOGIN_UPDATE_CHAR_LIST,
            payload: characters
        });*/
    }

};
