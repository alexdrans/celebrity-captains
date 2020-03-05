/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('arrivals', {
    id: 'id',
    captain_name: {
      type: 'varchar',
      notNull: true,
    },
    vessel_name: {
      type: 'varchar',
      notNull: true,
    },
    port: {
      type: 'varchar',
      notNull: true,
    },
    arrived_at: {
      type: 'timestamp',
      notNull: true,
    },
  });
};

exports.down = pgm => {};
