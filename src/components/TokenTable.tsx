import React from 'react'

const TokenTable = (props: any) => {
    
    
    return (props.trigger) ? (
        
        
        <div>
            <table className="border-collapse ml-6 text-base">
                <thead>
                    <tr>
                        <th className="border pl-2 border-solid text-left bg-indigo-900 text-white">Token Name</th>
                        <th className="border pl-2 border-solid text-left bg-indigo-900 text-white">Token Account</th>
                        <th className="border pl-2 pr-2 border-solid text-left bg-indigo-900 text-white">Supply</th>
                        <th className="border pl-2 pr-2 border-solid text-left bg-indigo-900 text-white">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border pl-2 pr-2 border-solid bg-indigo-100 max-w-xs whitespace-nowrap truncate">A very, very long adress that cannot be showed entirely
</td>
                        <td className="border pl-2 pr-2 border-solid bg-indigo-100 max-w-xs whitespace-nowrap truncate">A very, very long comment to add more information to the row it belongs to.</td>
                        <td className="border p-1 border-solid bg-indigo-100">100</td>
                        <td className="border p-1 border-solid bg-indigo-100">30</td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) : <div></div>;
}

export default TokenTable
