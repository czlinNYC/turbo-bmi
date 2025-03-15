import './corenav.css';
import { schema } from '../../schemas/schema';

const CoreNav = ({ view, drawer, selectView, page, adjustPage, data }) => {
	return (
		<div
			id="core-nav"
			className="flex-row core-nav-title center-vertical zain"
		>
			<div id="core-nav-left" className="flex-row">
				<span>
					{view.view === 'bulk' ? `${drawer} Bulk Upload` : drawer}
				</span>
				{view.view === 'bulk' ? (
					<></>
				) : (
					<span id="page-button-container" className="center-items">
						{page > 0 ? (
							<button
								id="back-page"
								className="center-items zain page-button"
								onClick={() => adjustPage('decrease')}
							>
								<span className="material-symbols-sharp button-content small-icon black">
									arrow_back
								</span>
							</button>
						) : (
							<></>
						)}
						{data.data.length < 100 ? (
							<></>
						) : (
							<button
								id="forward-page"
								className="center-items zain page-button"
								onClick={() => adjustPage('increase')}
							>
								<span className="material-symbols-sharp button-content small-icon black">
									arrow_forward
								</span>
							</button>
						)}
					</span>
				)}
			</div>

			<div id="core-nav-right" className="flex-row">
				{view.view !== 'edit' && drawer === 'Prospects' ? (
					<button
						className="center-items core-nav-button zain"
						onClick={() => {
							view.view === 'list'
								? selectView({
										view: 'bulk',
										item: null,
										schema: schema[drawer].schema
									})
								: selectView({
										view: 'list',
										item: null,
										schema: null
									});
						}}
					>
						<span className="material-symbols-sharp button-content small-icon black">
							{view.view === 'list' ? 'upload' : 'exit_to_app'}
						</span>
						<span className="zain button-content">
							{view.view === 'list' ? 'Bulk Upload' : 'Back'}
						</span>
					</button>
				) : (
					<></>
				)}
				{view.view !== 'bulk' ? (
					<button
						className="center-items core-nav-button zain"
						onClick={() => {
							view.view === 'list'
								? selectView({
										view: 'edit',
										item: null,
										schema: schema[drawer].schema
									})
								: selectView({
										view: 'list',
										item: null,
										schema: null
									});
						}}
					>
						<span className="material-symbols-sharp button-content small-icon black">
							{view.view === 'list' ? 'edit_note' : 'exit_to_app'}
						</span>
						<span className="zain button-content">
							{view.view === 'list' ? 'New' : 'Back'}
						</span>
					</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
export default CoreNav;
