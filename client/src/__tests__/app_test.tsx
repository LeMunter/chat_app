import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import App from '../App';

const wrapper = shallow(<App />);
describe('App', () => {
    it('should render div', () => {
        expect(wrapper.find('div').hasClass('App')).toBe(true);
    });
});
