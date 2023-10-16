import * as actions from './TestPageActions.js';
import {useEffect, useState} from "react";
import './TestPage.scss';

const TestPage = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        actions.loadRecords(setRecords);
    }, []);

    return <div className="records">Records:
        {records.map((r, i) => <div key={i}>
            {r.id} : {r.name}
        </div>)}
    </div>;
}
export default TestPage;