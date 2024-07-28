import React from "react";

export default function CollectionsItem({title, img, alt}) {
  return (
    <>
      <div key="mov1" className="col-6 col-sm-6 col-lg-4 col-xl-4">
              <div className="item">
                <div className="col_item__cover">
                  <img src={img} alt={alt} loading="lazy" />
                </div>
                  <h2 className="collection_item__title">
                    {title}
                  </h2>
              </div>
            </div>
    </>
  );
}
