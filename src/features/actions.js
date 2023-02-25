/* Export Messages */
export const PACKAGE_ADDED = 'Package Added';
export const SCRAP_ADDED = 'Scrap Added';
export const INQUIRY_ADDED = 'Inquiry Added';
export const USER_ADDED = 'User Added';
export const LOG_ADDED = 'Log Added';
export const ERROR = 'Error';

/* ↓Package */
export const addPackage = ({ firestore }, packages) => {
    return (dispatch) => {
        firestore
        .collection('packages')
        .add(packages)
        .then((doc) => {
            /* ↓idの同期 */
            firestore.collection('packages').doc(doc.id).update({id: doc.id});
            dispatch({ type: PACKAGE_ADDED, packages });
        })
        .catch(err => {
            dispatch({ type: ERROR, err });
        });
    };
};

/* ↓Scrap */
export const addScrap = ({ firestore }, scraps) => {
    return (dispatch) => {
        firestore
        .collection('scraps')
        .add(scraps)
        .then((doc) => {
            /* ↓idの同期 */
            firestore.collection('scraps').doc(doc.id).update({id: doc.id});
            dispatch({ type: SCRAP_ADDED, scraps });
        })
        .catch(err => {
            dispatch({ type: ERROR, err });
        });
    };
};

/* ↓Inquiry */
export const addInquiry = ({ firestore }, inquiry) => {
    return (dispatch) => {
        firestore
        .collection('inquiries')
        .add(inquiry)
        .then((doc) => {
            /* ↓idの同期 */
            firestore.collection('inquiries').doc(doc.id).update({id: doc.id});
            dispatch({ type: INQUIRY_ADDED, inquiry });
        })
        .catch(err => {
            dispatch({ type: ERROR, err });
        });
    };
};

/* ↓User */
export const addUser = ({ firestore }, users) => {
    return (dispatch) => {
        firestore
        .collection('users')
        .add(users)
        .then((doc) => {
            /* ↓idの同期 */
            firestore.collection('users').doc(doc.id).update({id: doc.id});
            dispatch({ type: USER_ADDED, users });
        })
        .catch(err => {
            dispatch({ type: ERROR, err });
        });
    };
};

/* ↓Log */
export const addLog = ({ firestore }, log) => {
    return (dispatch) => {
        firestore
        .collection('serverlogs')
        .add(log)
        .then(() => {
            dispatch({ type: SERVERLOG_ADDED, log });
        })
        .catch(err => {
            dispatch({ type: ERROR, err });
        });
    };
};