""" create the Users table

Revision ID: 51e2c29ad95
Revises: 4f2e2c180af
Create Date: 2016-10-02 16:00:01.042947

"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '51e2c29ad95'
down_revision = '4f2e2c180af'


def upgrade():
    op.create_table(
        'users',
        sa.Column('username', sa.String(length=24), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password', sa.Binary(), nullable=False),
    )


def downgrade():
    op.drop_table('users')
