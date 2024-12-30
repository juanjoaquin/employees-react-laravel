import React from 'react'


export const HomeDetail = ({data}) => {
  return (
    <div className='text-center'>
        HomeDetail

    {data.map((employee) => {
        return(
            <div key={employee.id}>
                
            </div>
        )
    })}
    </div>
  );
};
