// __tests__/hello_world.test.js
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import Logout from '../components/Logout';

const wrapper = shallow(<Logout />);
describe('Logout Component', () => {
    it('Logout a tag redirects', () => {
        expect(wrapper.find('a').find({ href: '/' }).exists()).toBe(true);
    });
});
