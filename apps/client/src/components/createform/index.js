// CSS for this file can be found in coredisplay.css
// It shares many same id's and classes with editform component.
import { schema } from '../../schemas/schema';

const CreateForm = ({ view, selectApiCall, selectView, handleChange }) => {
	return (
		<div id="entity-edit-form">
			{schema['Prospects_full'].map((item, index) => {
				return (
					<>
						<div className="form-input-label zain">{item[0]}</div>
						<input
							type="text"
							value={schema ? view.item[item[1]] : ''}
							className="form-input zain"
							onChange={handleChange(item[1])}
						></input>
					</>
				);
			})}
			<div id="form-button-row" className="flex-row center-items">
				<button
					className="prof-nav-button form-button zain"
					onClick={async () => {
						await selectApiCall(view.item, 'CREATE');
						await selectView({
							...view,
							...{ view: 'list', item: null }
						});
					}}
				>
					Create
				</button>
				<button
					className="prof-nav-button form-button zain"
					onClick={() => {
						selectView({
							view: 'list',
							item: null,
							schema: null
						});
					}}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};
export default CreateForm;
