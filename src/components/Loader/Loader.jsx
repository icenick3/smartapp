import React, {CSSProperties, useEffect, useState} from 'react';
import {ClockLoader, CircleLoader, ClimbingBoxLoader, DotLoader, PacmanLoader} from "react-spinners";

import './Loader.scss'

const Loader = ({loading}) => {

    const [state, setState] = useState()

    const override:CSSProperties = {
        display: "block",
        margin: "0 auto"
    };
    useEffect(() => {
        setState(Math.round(Math.random() * 4))
    }, [])
    return (
        <div>
            <div className={'ClockLoader'}>
                <div className={'ClockLoader-content'}>
                    {state === 1 && <ClockLoader
                        loading={loading}
                        color="#36d7b7"
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
                    {state === 2 && <CircleLoader
                        loading={loading}
                        color="#36d7b7"
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
                    {state === 3 && <ClimbingBoxLoader
                        loading={loading}
                        color="#36d7b7"
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
                    {state === 4 && <DotLoader
                        loading={loading}
                        color="#36d7b7"
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
                    {state === 0 && <PacmanLoader
                        loading={loading}
                        color="#36d7b7"
                        cssOverride={override}
                        size={90}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}

                </div>
                <div className={'mobileLoader'}>
                    {state && <ClockLoader
                        loading={loading}
                        color="#36d7b7"
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
                </div>
            </div>
        </div>
    );
};

export default Loader;
