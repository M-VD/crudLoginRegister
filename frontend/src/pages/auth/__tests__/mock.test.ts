import axios from 'axios'
import { diff } from 'jest-diff'
import { loginUser, refresh, registerUser } from './utils'
const base = process.env.REACT_APP_PUBLIC_API_ENDPOINT
const usersRefreshBase = `${base}/refresh`
const userRegistersBase = `${base}/users`
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
describe('auth', () => {
  describe('when API call is successful', () => {
    it('should return user', async () => {
      const user = {
        email: 'rika.amari@example.com',
        password: 'Superguy123',
        passwordConfirmation: 'Superguy123',
        firstName: 'mich',
        lastName: 'tamar',
      }

      const response = mockedAxios.post(userRegistersBase, user)
      // print diff
      console.log('dssddsds', response)
      // expect(r.data).toBeDefined()
      //expect(r.data.results.length).toBeGreaterThan(0)
      //expect(r.status).toBeGreaterThanOrEqual(200)
      expect(response).toEqual(user)
      //expect(r.status).toBeLessThan(300)

      /*.catch((e) => {
          fail(`Expected successful response`)
        })*/

      /* // given
      const user = {
        email: 'rika.amari@example.com',
        password: 'Superguy123',
        passwordConfirmation: 'Superguy123',
        firstName: 'mich',
        lastName: 'tamar',
      }

      mockedAxios.post.mockResolvedValueOnce(user)

      // when
      const result = await registerUser(user)

      // then
      //expect(axios.post).toHaveBeenCalledWith(userRegistersBase)
      expect(result).toEqual(user)*/
    })

    it('should login', async () => {
      // given
      const user = {
        email: 'rika.amari@example.com',
        password: 'Superguy123',
      }

      mockedAxios.post.mockResolvedValueOnce(user)

      // when
      const result = await loginUser(user)

      // then
      //expect(axios.post).toHaveBeenCalledWith(userRegistersBase)
      expect(result).toEqual(user)
    })
  })

  it('should get session', async () => {
    mockedAxios
      .get(usersRefreshBase)
      .then((r) => {
        expect(r.data).toBeDefined()
        expect(r.data.results.length).toBeGreaterThan(0)
        //expect(r.status).toBeGreaterThanOrEqual(200)
        expect(r.status).toEqual(200)
        //expect(r.status).toBeLessThan(300)
      })
      .catch((e) => {
        fail(`Expected successful response`)
      })
  })
})

/*
  describe('when API call fails', () => {
    it('should return empty users list', async () => {
      // given
      const message = 'Network Error'
      axios.get.mockRejectedValueOnce(new Error(message))

      // when
      const result = await fetchUsers()

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`)
      expect(result).toEqual([])
    })
  })
})

/*
function forEach(items, callback) {
	for (
		let index = 0;
		index < items.length;
		index++
	) {
		callback(items[index]);
	}
}

it('mock callback', () => {
	const mockCallback = jest.fn((x) => 42 + x);

	forEach([0, 1], mockCallback);

	expect(mockCallback.mock.calls.length).toBe(2);

	expect(mockCallback.mock.calls[0][0]).toBe(0);

	expect(mockCallback.mock.calls[1][0]).toBe(1);

	expect(mockCallback.mock.results[0].value).toBe(
		42
	);
});

it('return mock', () => {
	const mock = jest.fn();

	mock
		.mockReturnValueOnce(true)
		.mockReturnValueOnce(false);

	const results = mock();
	const results2 = mock();

	expect(results).toBe(true);
	expect(results2).toBe(false);
});

it('mock modules or custom functions', async () => {
	jest.spyOn(axios, 'get').mockReturnValueOnce({
		id: 1,
		todo: 'Do youtube',
	});

	const results = await fetchData(1);

	expect(results.todo).toBe('Do youtube');
});
*/
