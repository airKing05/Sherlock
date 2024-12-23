import { useState, CSSProperties } from "react";
import { ClipLoader, HashLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function HashLoaderComponent({ loading, size = 100 }) {

    return (
        <div className="loader__alignment">
            <HashLoader
                color={'#6A0DAD'}
                loading={loading}
                cssOverride={override}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}
