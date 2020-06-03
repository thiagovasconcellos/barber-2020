/* eslint-disable no-plusplus */
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthService: ListProviderMonthAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to show month availability from provider', async () => {
    const hourRange = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    const promise = hourRange.map(async hour => {
      await fakeAppointmentRepository.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    });

    await Promise.all(promise);

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 22, 11, 0, 0),
    });

    const availability = await listProviderMonthService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
