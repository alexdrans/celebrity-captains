/* eslint-disable camelcase */

exports.shorthands = undefined;

const timestamps = pgm => ({
  updatedAt: {
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp'),
  },
  createdAt: {
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp'),
  },
});

exports.up = pgm => {
  pgm.createTable('captains', {
    id: 'id',
    ...timestamps(pgm),
  });
  pgm.createTable('vessels', {
    id: 'id',
    name: { type: 'varchar(1024)', notNull: true },
    ...timestamps(pgm),
  });
  pgm.createTable('ports', {
    id: 'id',
    name: { type: 'varchar(1024)', notNull: true },
    ...timestamps(pgm),
  });
  pgm.createTable('visits', {
    id: 'id',
    captainId: {
      type: 'integer',
      notNull: true,
      references: '"captains"',
      onDelete: 'cascade',
    },
    vesselId: {
      type: 'integer',
      notNull: true,
      references: '"vessels"',
      onDelete: 'cascade',
    },
    portId: {
      type: 'integer',
      notNull: true,
      references: '"ports"',
      onDelete: 'cascade',
    },
    ...timestamps(pgm),
  });
};

exports.down = pgm => {};
