"""empty message

Revision ID: 8c0f54aeb3d7
Revises: f8450e6a6ac3
Create Date: 2020-07-24 07:26:00.005742

"""

# revision identifiers, used by Alembic.
revision = '8c0f54aeb3d7'
down_revision = 'f8450e6a6ac3'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    op.add_column('notebooks', sa.Column('id', sa.Integer, primary_key=True))


def downgrade():
    op.drop_column('notebooks', 'id')
