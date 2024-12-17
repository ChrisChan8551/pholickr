import React, { useState } from 'react';
import PopOver from '../PopOver';
import './GridLayout.css';
import { useSelector, useDispatch } from 'react-redux';


function GridLayout({
	items = [],
	buttonLabel = 'Options',
	onItemClick = null,
	renderItemActions = null,

}) {
	return (
		<div className='GridLayout--Container'>
			{items?.map((item) => (
				<GridItem
					key={item?.id}
					item={item}
					buttonLabel={buttonLabel}
					onItemClick={onItemClick}
					renderItemActions={renderItemActions}
				/>
			))}
		</div>
	);
}

export default GridLayout;

function GridItem({ item, buttonLabel, onItemClick, renderItemActions }) {
    const [popOverOpen, setPopOverOpen] = useState(false);
    const { image, imageUrl = image } = item;
    const currentUser = useSelector((state) => state.session.user);
    
    return (
      <div
        className='GridLayout--Item'
        onClick={
          typeof onItemClick !== 'function' ? undefined : (event) => onItemClick(item, event)
        }
        style={{
          cursor: onItemClick ? 'pointer' : 'auto',
        }}
      >
        <div className='GridLayout--ImageContainer'>
          <img
            src={imageUrl}
            crossOrigin='anonymous'
            className='GridLayout--Image'
            alt={item.title}
          />

          {currentUser && <div className='GridLayout--Title'>{item.title}</div>}
        </div>

        {!!renderItemActions && (
          <div className='GridLayout--Actions'>
            <PopOver
              open={popOverOpen}
              setOpen={setPopOverOpen}
              style={{
                top: '25px',
              }}
              button={
                <button
                  className='blue-button'
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setPopOverOpen(true);
                  }}
                >
                  {buttonLabel}
                </button>
              }
            >
              <div
                className='GridLayout--Action--Content'
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                {typeof renderItemActions === 'function' &&
                  renderItemActions(item, () => setPopOverOpen(false))}
              </div>
            </PopOver>
          </div>
        )}
      </div>
    );
  }
