import React from "react";

export default function Movies() {
    return (
        <>
    {/* page title*/}
	<section className="section section--first">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="section__wrap">
						{/* section title*/}
						<h1 className="section__title section__title--head">Catalog</h1>
						{/* end section title*/}

						{/* breadcrumbs*/}
						<ul className="breadcrumbs">
							<li className="breadcrumbs__item"><a href="index.html">Home</a></li>
							<li className="breadcrumbs__item breadcrumbs__item--active">Catalog</li>
						</ul>
						{/* end breadcrumbs*/}
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* end page title*/}

	{/* fixed filter wrap*/}
	<div>
		{/* filter (fixed position)*/}
		<div className="filter filter--fixed">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="filter__content">
							{/* menu btn*/}
							<button className="filter__menu" type="button"><i className="ti ti-filter"></i>Filter</button>
							{/* end menu btn*/}

							{/* filter desk*/}
							<div className="filter__items">
								<select className="filter__select" name="genre" id="filter__genre">
									<option value="0">All genres</option>
									<option value="1">Action/Adventure</option>
									<option value="2">Animals</option>
									<option value="3">Animation</option>
									<option value="4">Biography</option>
									<option value="5">Comedy</option>
									<option value="6">Cooking</option>
									<option value="7">Dance</option>
									<option value="8">Documentary</option>
									<option value="9">Drama</option>
									<option value="10">Education</option>
									<option value="11">Entertainment</option>
									<option value="12">Family</option>
									<option value="13">Fantasy</option>
									<option value="14">History</option>
									<option value="15">Horror</option>
									<option value="16">Independent</option>
									<option value="17">International</option>
									<option value="18">Kids</option>
									<option value="19">Medical</option>
									<option value="20">Military/War</option>
									<option value="21">Music</option>
									<option value="22">Mystery/Crime</option>
									<option value="23">Nature</option>
									<option value="24">Paranormal</option>
									<option value="25">Politics</option>
									<option value="26">Racing</option>
									<option value="27">Romance</option>
									<option value="28">Sci-Fi/Horror</option>
									<option value="29">Science</option>
									<option value="30">Science Fiction</option>
									<option value="31">Science/Nature</option>
									<option value="32">Spanish</option>
									<option value="33">Travel</option>
									<option value="34">Western</option>
								</select>

								<select className="filter__select" name="quality" id="filter__quality">
									<option value="0">Any quality</option>
									<option value="1">HD 1080</option>
									<option value="2">HD 720</option>
									<option value="3">DVD</option>
									<option value="4">TS</option>
								</select>

								<select className="filter__select" name="rate" id="filter__rate">
									<option value="0">Any rating</option>
									<option value="1">from 3.0</option>
									<option value="2">from 5.0</option>
									<option value="3">from 7.0</option>
									<option value="4">Golder Star</option>
								</select>

								<select className="filter__select" name="sort" id="filter__sort">
									<option value="0">Relevance</option>
									<option value="1">Newest</option>
									<option value="2">Oldest</option>
								</select>
							</div>
							{/* end filter desk*/}
							
							{/* filter btn*/}
							<button className="filter__btn" type="button">Apply</button>
							{/* end filter btn*/}

							{/* amount*/}
							<span className="filter__amount">Showing 18 of 1713</span>
							{/* end amount*/}
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* end filter (fixed position)*/}
		
		{/* catalog*/}
		<div className="section section--catalog">
			<div className="container">
				<div className="row">
					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">8.4</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">I Dream in Another Language</a></h3>
								<span className="item__category">
									<a href="#">Action</a>
									<a href="#">Triler</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover2.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">7.1</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Benched</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover3.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--red">6.3</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Whitney</a></h3>
								<span className="item__category">
									<a href="#">Romance</a>
									<a href="#">Drama</a>
									<a href="#">Music</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover4.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--yellow">6.9</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Blindspotting</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
									<a href="#">Drama</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover5.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">8.4</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">I Dream in Another Language</a></h3>
								<span className="item__category">
									<a href="#">Action</a>
									<a href="#">Triler</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover6.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">7.1</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Benched</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover7.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">7.1</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Benched</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover8.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--red">5.5</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">I Dream in Another Language</a></h3>
								<span className="item__category">
									<a href="#">Action</a>
									<a href="#">Triler</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover9.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--yellow">6.7</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Blindspotting</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
									<a href="#">Drama</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover10.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--red">5.6</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Whitney</a></h3>
								<span className="item__category">
									<a href="#">Romance</a>
									<a href="#">Drama</a>
									<a href="#">Music</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover11.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">9.2</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Benched</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover12.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">8.4</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">I Dream in Another Language</a></h3>
								<span className="item__category">
									<a href="#">Action</a>
									<a href="#">Triler</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover13.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">8.0</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">I Dream in Another Language</a></h3>
								<span className="item__category">
									<a href="#">Action</a>
									<a href="#">Triler</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover14.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">7.2</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Benched</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover15.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--yellow">5.9</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Whitney</a></h3>
								<span className="item__category">
									<a href="#">Romance</a>
									<a href="#">Drama</a>
									<a href="#">Music</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover16.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">8.3</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Blindspotting</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
									<a href="#">Drama</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover17.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">8.0</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">I Dream in Another Language</a></h3>
								<span className="item__category">
									<a href="#">Action</a>
									<a href="#">Triler</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}

					{/* item*/}
					<div className="col-6 col-sm-4 col-lg-3 col-xl-2">
						<div className="item">
							<div className="item__cover">
								<img src="img/covers/cover18.jpg" alt="" />
								<a href="details.html" className="item__play">
									<i className="ti ti-player-play-filled"></i>
								</a>
								<span className="item__rate item__rate--green">7.1</span>
								<button className="item__favorite" type="button"><i className="ti ti-bookmark"></i></button>
							</div>
							<div className="item__content">
								<h3 className="item__title"><a href="details.html">Benched</a></h3>
								<span className="item__category">
									<a href="#">Comedy</a>
								</span>
							</div>
						</div>
					</div>
					{/* end item*/}
				</div>

				<div className="row">
					{/* more*/}
					<div className="col-12">
						<button className="section__more" type="button">Load more</button>
					</div>
					{/* end more*/}
				</div>
			</div>
		</div>
		{/* end catalog*/}
	</div>
	{/* end fixed filter wrap*/}
    </>)
}