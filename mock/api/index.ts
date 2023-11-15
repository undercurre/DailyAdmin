import auth from './auth';
import route from './route';
import management from './management';
import sys from './sys';

export default [...auth, ...route, ...management, ...sys];
