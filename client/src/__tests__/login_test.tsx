// __tests__/hello_world.test.js
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import Login from '../components/Login';

const wrapper = shallow(<Login />);
describe('Login Component', () => {
    const userInput = wrapper.find('input[id="username"]');
    const pwInput = wrapper.find('input[id="password"]');

    it('should render an username input tag', () => {
        expect(userInput.exists()).toBe(true);
    });

    it('should render a password input tag', () => {
        expect(pwInput.exists()).toBe(true);
    });

    it('should render a submit button', () => {
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    it('the default value for both fields should be the placeholder', () => {
        expect(userInput.prop('placeholder')).toBe('Enter Username');
        expect(pwInput.prop('placeholder')).toBe('Enter Password');
    });
});
