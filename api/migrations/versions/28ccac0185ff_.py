"""Add secret column to Users

Revision ID: 28ccac0185ff
Revises: 51e2c29ad95
Create Date: 2020-05-28 14:04:34.791746

"""

# revision identifiers, used by Alembic.
revision = '28ccac0185ff'
down_revision = '51e2c29ad95'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    op.add_column('users', sa.Column('secret', sa.String(length=19), nullable=True))


def downgrade():
    op.drop_column('users', 'secret')
